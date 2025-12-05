import { useState } from "react"

import { CloseIcon } from "@/components/icons"
import { Button, Popover, type PopoverContentProps } from "@/components/ui"

export type PopoverTemplateProps = Pick<
  PopoverContentProps,
  "index" | "className" | "title" | "titleClassName" | "childrenClassName" | "isOpen" | "children"
> & {
  trigger: string
}
/**
 * Popover는 부가적인 정보를 제공할 때 사용하는 컴포넌트입니다.
 *
 * - Trigger: Icon, Text, Button
 * - Title과 X 버튼이 Header 영역에 존재하며, X버튼을 눌러야 닫힙니다.
 * - className을 변경하여 나타나는 위치를 조절할 수 있습니다.
 *
 * @example
 * ```tsx
 * function display(e: boolean) {
 *   setShow(e)
 *  }
 * <Button onClick={() => display(!show)}>Open Popover</Button>
 * <Popover
 *  isOpen={show}
 *  title="Title_Inputplace"
 *  children={children}
 *  display={(e) => display(e)}
 * />
 *
 */
export function PopoverTemplate({
  index,
  className,
  title,
  titleClassName,
  childrenClassName,
  isOpen,
  children,
  trigger,
}: PopoverTemplateProps) {
  const [show, setShow] = useState(isOpen)
  function display(e: boolean) {
    setShow(e)
  }
  return (
    <div className="flex h-[300px] flex-col overflow-auto">
      <div className="flex h-screen flex-1 items-center justify-center">
        {trigger == "button" && (
          <Button onClick={() => display(!show)} children="Open popover" size="large" variant="secondary" />
        )}
        {trigger == "icon" && <CloseIcon onClick={() => display(!show)} size={20} />}
        {trigger == "text" && <div onClick={() => display(!show)}>Open popover</div>}
        <Popover
          index={index}
          className={className}
          titleClassName={titleClassName}
          childrenClassName={childrenClassName}
          title={title}
          isOpen={show}
          children={children}
          display={(e) => display(e)}
        />
      </div>
    </div>
  )
}
