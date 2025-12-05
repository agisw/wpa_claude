import { Button, MessageModal, Modal, ModalCheckbox, ModalClose } from "@/components/ui"

const footerMessage = (
  <div className="flex w-full flex-row justify-between">
    <div className="flex items-center overflow-hidden whitespace-nowrap">
      <ModalCheckbox id="1" label="오늘 하루종일 표현 안 함." />
    </div>
    <ModalClose>
      <Button variant="secondary" className="h-[28px] w-[48px]">
        닫기
      </Button>
    </ModalClose>
  </div>
)
const footerForm = (
  <div className="flex flex-row justify-between">
    <div className="flex items-center">
      <ModalCheckbox id="1" label="text" />
      <ModalCheckbox id="2" label="text" />
    </div>
    <ModalClose>
      <Button size="large" variant="secondary">
        닫기
      </Button>
    </ModalClose>
  </div>
)

export function ModalDemo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <MessageModal defaultOpen message={"Message Modal"} footer={footerMessage} className={"noOverlay top-[15%]"} />
      <Modal
        defaultOpen
        title="Form Modal"
        size="xs"
        content={"Form Modal XS"}
        footer={footerForm}
        className={"noOverlay top-[50%] left-[14.5%]"}
      />
      <Modal
        defaultOpen
        title="Form Modal"
        size="sm"
        content={"Form Modal SM"}
        footer={footerForm}
        className={"noOverlay top-[50%] left-[43%]"}
      />
      <Modal
        defaultOpen
        title="Form Modal"
        size="md"
        content={"Form Modal MD"}
        footer={footerForm}
        className={"noOverlay top-[50%] left-[79%]"}
      />
    </div>
  )
}
