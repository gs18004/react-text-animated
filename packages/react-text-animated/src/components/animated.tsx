import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import React, {
  ComponentProps,
  ElementType,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  Ref,
  RefAttributes,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { TEXT_TAGS } from '../constants/textTags';
import {
  AnimationType,
  ElementOfTag,
  GsapVars,
  SplitType,
  TextTag,
} from '../types/types';
import { getAnimationPresets } from '../utils/getAnimationPresets';

gsap.registerPlugin(Flip, SplitText);
const supportedTags = new Set<string>(TEXT_TAGS);

type UnitObject = { content: string; id: number };
type LeavingUnitObject = UnitObject & {
  bounds: { top: number; left: number; width: number; height: number };
};
type AnimatedComponentProps = {
  children?: React.ReactNode;
  splitBy?: SplitType;
  animationType?: AnimationType;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: gsap.EaseString | gsap.EaseFunction;
  from?: GsapVars;
  whenPropChange?: 'reanimate' | 'morph' | 'none';
};
type AnimatedBaseImplProps<T extends ElementType> = AnimatedBaseProps<T> & {
  shouldAnimate?: boolean;
};
type AnimatedBaseProps<T extends ElementType> = AnimatedComponentProps & {
  as?: T;
} & Omit<ComponentProps<T>, keyof AnimatedComponentProps | 'as'>;

const splitText = (text: string, splitBy: SplitType): string[] => {
  const placeholderRegex = /(__MORPH_ELEMENT_\d+__)/;
  switch (splitBy) {
    case 'words':
      return text.split(/(__MORPH_ELEMENT_\d__|\s+)/).filter(Boolean);
    case 'lines':
      return text.split(placeholderRegex).filter(Boolean);
    case 'chars':
    default:
      return text
        .split(placeholderRegex)
        .filter(Boolean)
        .flatMap((part) =>
          placeholderRegex.test(part) ? part : part.split(''),
        );
  }
};

const AnimatedBaseImpl = forwardRef(
  (
    {
      as,
      children,
      splitBy = 'chars',
      animationType = 'fadeInUp',
      stagger: customStagger = 0.03,
      duration: customDuration = 0.8,
      delay: customDelay,
      ease: customEase = 'power4.inOut',
      from: customFrom,
      whenPropChange = 'reanimate',
      shouldAnimate,
      style,
      ...restProps
    }: AnimatedBaseImplProps<ElementType>,
    ref: Ref<HTMLElement>,
  ) => {
    const Component = as ?? 'div';
    const targetRef = useRef<HTMLElement>(null);
    const internalRef = (ref ?? targetRef) as React.RefObject<HTMLElement>;

    const [units, setUnits] = useState<UnitObject[]>([]);
    const [leavingUnits, setLeavingUnits] = useState<LeavingUnitObject[]>([]);
    const flipState = useRef<Flip.FlipState | null>(null);
    const unitIdCounter = useRef(0);
    const { unifiedString, elementMap } = useMemo(() => {
      let unifiedString = '';
      const elementMap = new Map<string, React.ReactElement>();
      let elementIndex = 0;
      React.Children.forEach(children, (child) => {
        if (typeof child === 'string') {
          unifiedString += child.replace(/[\n\r\t]/g, ' ');
        } else if (React.isValidElement(child)) {
          const placeholder = `__MORPH_ELEMENT_${elementIndex}__`;
          unifiedString += placeholder;
          elementMap.set(placeholder, child as React.ReactElement);
          elementIndex++;
        }
      });
      return { unifiedString, elementMap };
    }, [children]);

    useLayoutEffect(() => {
      if (whenPropChange !== 'morph' || !internalRef.current) return;
      flipState.current = Flip.getState(
        Array.from(internalRef.current.children),
      );
      const oldUnits = [...units];
      const newUnits: UnitObject[] = [];
      const newStringSplits = splitText(unifiedString, splitBy);
      for (const content of newStringSplits) {
        const isPlaceholder = elementMap.has(content);
        const matchIndex = oldUnits.findIndex(
          (old) =>
            old.content === content && (isPlaceholder || old.content !== ' '),
        );
        if (matchIndex !== -1) {
          newUnits.push(oldUnits[matchIndex]);
          oldUnits.splice(matchIndex, 1);
        } else {
          newUnits.push({ content, id: unitIdCounter.current++ });
        }
      }
      if (oldUnits.length > 0) {
        const parentBounds = internalRef.current.getBoundingClientRect();
        const unitsToLeave: LeavingUnitObject[] = oldUnits.map((unit) => {
          const element = internalRef.current?.querySelector(
            `[data-flip-id='${unit.id}']`,
          );
          const elementState = element
            ? flipState.current!.getElementState(element)
            : null;
          return {
            ...unit,
            bounds: elementState
              ? {
                  top: elementState.bounds.top - parentBounds.top,
                  left: elementState.bounds.left - parentBounds.left,
                  width: elementState.bounds.width,
                  height: elementState.bounds.height,
                }
              : { top: 0, left: 0, width: 0, height: 0 },
          };
        });
        setLeavingUnits((prev) => [...prev, ...unitsToLeave]);
      }
      setUnits(newUnits);
    }, [unifiedString, splitBy, elementMap, whenPropChange, internalRef]);

    useGSAP(
      () => {
        if (whenPropChange !== 'morph' || !flipState.current) return;

        const preset = getAnimationPresets(animationType);
        const fromVars = customFrom ?? preset.from;

        Flip.from(flipState.current, {
          targets: units.map((c) => `[data-flip-id='${c.id}']`),
          duration: customDuration,
          ease: customEase,
          stagger: customStagger,
          onEnter: (elements) => {
            gsap.from(elements, {
              ...fromVars,
              duration: customDuration,
              stagger: customStagger,
              ease: customEase,
            });
          },
        });
      },
      { scope: internalRef, dependencies: [units] },
    );

    useGSAP(
      () => {
        if (whenPropChange === 'morph' || !internalRef.current) return;
        const element = internalRef.current;
        const preset = getAnimationPresets(animationType);
        const fromVars = customFrom ?? preset.from;
        const splittedText = new SplitText(element, { type: splitBy });
        const targets = splittedText[splitBy] || [];

        if (shouldAnimate) {
          gsap.from(targets, {
            ...fromVars,
            duration: customDuration,
            delay: customDelay,
            stagger: customStagger,
            ease: customEase,
          });
        }
        return () => {
          splittedText.revert();
        };
      },
      {
        scope: internalRef,
        dependencies: [
          shouldAnimate,
          children,
          splitBy,
          animationType,
          customDuration,
          customDelay,
          customStagger,
          customEase,
        ],
      },
    );

    useEffect(() => {
      if (whenPropChange !== 'morph' || leavingUnits.length === 0) return;

      const preset = getAnimationPresets(animationType);
      const fromVars = customFrom ?? preset.from;

      const leavingElements = leavingUnits
        .map((c) =>
          internalRef.current?.querySelector(`[data-flip-id='${c.id}']`),
        )
        .filter(Boolean);

      if (leavingElements.length > 0) {
        gsap.to(leavingElements, {
          ...fromVars,
          duration: customDuration,
          stagger: customStagger,
          onComplete: () => {
            setLeavingUnits([]);
          },
        });
      } else {
        setLeavingUnits([]);
      }
    }, [leavingUnits]);

    const renderUnit = (
      unit: UnitObject | LeavingUnitObject,
      isLeaving = false,
    ) => {
      const { content, id } = unit;
      const key = `${id}-${content}`;
      if (elementMap.has(content)) {
        const element = elementMap.get(content)!;
        const style: React.CSSProperties = {
          display: element.type === 'br' ? 'block' : 'inline-block',
          height: element.type === 'br' ? 0 : undefined,
        };
        if (isLeaving) {
          const bounds = (unit as LeavingUnitObject).bounds;
          Object.assign(style, {
            position: 'absolute',
            top: bounds.top,
            left: bounds.left,
            width: bounds.width,
            height: bounds.height,
          });
        }
        return React.cloneElement(
          <span style={style} data-flip-id={id} key={key}></span>,
          {},
          element,
        );
      }
      const style: React.CSSProperties = {
        display: 'inline-block',
        whiteSpace: /^\s+$/.test(content) ? 'pre' : 'normal',
      };
      if (isLeaving) {
        const bounds = (unit as LeavingUnitObject).bounds;
        Object.assign(style, {
          position: 'absolute',
          top: bounds.top,
          left: bounds.left,
          width: bounds.width,
          height: bounds.height,
        });
      }
      return (
        <span key={key} data-flip-id={id} style={style}>
          {content}
        </span>
      );
    };

    return (
      <Component
        ref={internalRef}
        style={{
          ...style,
          position: whenPropChange === 'morph' ? 'relative' : style?.position,
        }}
        {...restProps}
      >
        {whenPropChange === 'morph' ? (
          <>
            {units.map((unit) => renderUnit(unit, false))}
            {leavingUnits.map((unit) => renderUnit(unit, true))}
          </>
        ) : (
          children
        )}
      </Component>
    );
  },
);

const AnimatedBase = forwardRef(
  (props: AnimatedBaseProps<ElementType>, ref: Ref<HTMLElement>) => {
    const { whenPropChange = 'reanimate', children } = props;
    const isInitialRender = useRef(true);
    useEffect(() => {
      isInitialRender.current = false;
    }, []);
    const shouldAnimate =
      whenPropChange === 'reanimate' || isInitialRender.current;
    const key = useMemo(() => {
      if (whenPropChange === 'morph') return 'morph-instance';
      return React.Children.toArray(children).join('');
    }, [children, whenPropChange]);
    return (
      <AnimatedBaseImpl
        {...props}
        key={key}
        shouldAnimate={shouldAnimate}
        ref={ref}
      />
    );
  },
);

const createAnimatedComponent = <T extends TextTag>(tag: T) => {
  type Props = AnimatedComponentProps &
    Omit<ComponentProps<T>, keyof AnimatedComponentProps>;
  const component = forwardRef<ElementOfTag<T>, Props>((props, ref) => {
    return <AnimatedBase {...props} as={tag} ref={ref as Ref<HTMLElement>} />;
  });
  component.displayName = `Animated(${tag})`;
  return component;
};

type AnimatedProxy = {
  [K in TextTag]: ForwardRefExoticComponent<
    PropsWithoutRef<AnimatedBaseProps<K>> & RefAttributes<ElementOfTag<K>>
  >;
};
const animatedCache = new Map<TextTag, unknown>();
const animated = new Proxy(
  {},
  {
    get: (_, tag: TextTag) => {
      if (!supportedTags.has(tag))
        throw new Error(`[animated] The <${tag}> tag is not supported.`);
      if (animatedCache.has(tag)) return animatedCache.get(tag);
      const animatedComponent = createAnimatedComponent(tag);
      animatedCache.set(tag, animatedComponent);
      return animatedComponent;
    },
  },
) as AnimatedProxy;

export default animated;
