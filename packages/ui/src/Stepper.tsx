import { Children, cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

export type StepType = "passed" | "active" | "default";

export type StepperStepProps = {
  /** Label shown next to / above the step marker. */
  stepTitle: ReactNode;
  /** Progress state of this step. */
  stepType?: StepType;
  /** @internal injected by Stepper */
  __isLast?: boolean;
  /** @internal injected by Stepper */
  __vertical?: boolean;
  /** @internal injected by Stepper */
  __small?: boolean;
  /** @internal injected by Stepper */
  __transition?: boolean;
};

const SZ = {
  normal: {
    dot: "h-8 w-8",
    active: "h-12 w-12",
    center: "h-3 w-3",
    rowH: "h-12",
    text: "text-base",
    halo: "shadow-[0_0_0_5px_#d2eafa]",
  },
  small: {
    dot: "h-5 w-5",
    active: "h-8 w-8",
    center: "h-2 w-2",
    rowH: "h-8",
    text: "text-sm",
    halo: "shadow-[0_0_0_3px_#d2eafa]",
  },
};

export const StepperStep = ({
  stepTitle,
  stepType = "default",
  __isLast = false,
  __vertical = false,
  __small = false,
  __transition = false,
}: StepperStepProps) => {
  const sz = __small ? SZ.small : SZ.normal;
  const trans = __transition ? "transition-all duration-500" : "";

  const isPassed = stepType === "passed";
  const isActive = stepType === "active";

  const titleCls = isActive
    ? "font-bold text-[#252626]"
    : isPassed
      ? "font-semibold text-[#2d7048]"
      : "text-[#8a8a8a]";

  // Connector segment that leaves this step is green once the step is passed.
  const lineCls = isPassed ? "bg-[#4e9c54]" : "bg-[#c0c0c0]";

  const marker = isActive ? (
    <span
      className={`relative z-10 flex shrink-0 items-center justify-center rounded-full bg-[#116fae] ${sz.active} ${sz.halo} ${trans}`}
    >
      <span className={`rounded-full bg-white ${sz.center}`} />
    </span>
  ) : (
    <span
      className={`relative z-10 shrink-0 rounded-full ${sz.dot} ${
        isPassed ? "bg-[#4e9c54]" : "bg-[#c0c0c0]"
      } ${trans}`}
    />
  );

  if (__vertical) {
    // Definite row height so the connector's `h-full` resolves; the marker is
    // centered in a self-stretch column so the center-to-center line connects
    // cleanly regardless of marker size.
    const rowH = __small ? "h-14" : "h-[72px]";
    const lastH = __small ? "h-8" : "h-12";
    const colW = __small ? "w-8" : "w-12";
    return (
      <li className={`flex items-center gap-4 ${__isLast ? lastH : rowH}`}>
        <div className={`relative flex shrink-0 items-center justify-center self-stretch ${colW}`}>
          {!__isLast && (
            <span
              className={`absolute left-1/2 top-1/2 z-0 h-full w-[3px] -translate-x-1/2 ${lineCls} ${trans}`}
            />
          )}
          {marker}
        </div>
        <div className={`${sz.text} ${titleCls} ${trans}`}>{stepTitle}</div>
      </li>
    );
  }

  return (
    <li className="relative flex min-w-0 flex-1 flex-col items-center">
      <span className={`mb-6 whitespace-nowrap ${sz.text} ${titleCls} ${trans}`}>
        {stepTitle}
      </span>
      <div className={`relative flex w-full items-center justify-center ${sz.rowH}`}>
        {!__isLast && (
          <span
            className={`absolute left-1/2 top-1/2 z-0 h-[3px] w-full -translate-y-1/2 ${lineCls} ${trans}`}
          />
        )}
        {marker}
      </div>
    </li>
  );
};

export type StepperProps = {
  /** Animate marker/connector changes. */
  transition?: boolean;
  /** Stack steps vertically. */
  vertical?: boolean;
  /** Compact size. */
  small?: boolean;
  className?: string;
  children?: ReactNode;
};

export const Stepper = ({
  transition = false,
  vertical = false,
  small = false,
  className,
  children,
}: StepperProps) => {
  const steps = Children.toArray(children).filter(isValidElement) as ReactElement<StepperStepProps>[];
  const last = steps.length - 1;

  return (
    <div className={["w-full", vertical ? "" : "px-4", className].filter(Boolean).join(" ")}>
      <ul className={`m-0 flex list-none p-0 ${vertical ? "flex-col" : "flex-row"}`}>
        {steps.map((child, i) =>
          cloneElement(child, {
            key: i,
            __isLast: i === last,
            __vertical: vertical,
            __small: small,
            __transition: transition,
          }),
        )}
      </ul>
    </div>
  );
};
