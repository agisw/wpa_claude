import { Args } from "@/stories/LayoutExamples.stories"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { ConfidentialIcon, GearIcon, InformationIcon } from "@/components/icons"
import {
  Button,
  DetailPageHeader,
  Footer,
  Header,
  Lnb,
  Page,
  ScrollArea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui"

/**
 * Header, LNB, Content, Footer로 구성된 가장 일반적인 웹 애플리케이션 레이아웃입니다.
 */

export const sdpSrsDetailLayoutSample = (args: Args) => (
  <div className="flex h-screen w-full flex-col overflow-hidden">
    {/* Header */}
    <Header
      logo="SDP"
      theme={args.headerTheme}
      style={{ "--color-header-bg": "var(--colors-gate-purple-gate-purple-11)" } as React.CSSProperties}
      size={args.headerSize}
      gnb={[
        { content: "SENSDES-RND", items: [{ content: "테넌트 관리", value: "tenant" }], type: "tenant" },
        { type: "divider" },
        {
          type: "menu",
          content: "My Task",
          items: [
            { content: "API 문서", value: "api" },
            { content: "가이드", value: "guide" },
          ],
        },
        {
          type: "menu",
          content: "Management",
          items: [
            { content: "API 문서", value: "api" },
            { content: "가이드", value: "guide" },
          ],
        },
        {
          type: "menu",
          content: "Test Design",
          items: [
            { content: "API 문서", value: "api" },
            { content: "가이드", value: "guide" },
          ],
        },
      ]}
      utility={[
        { type: "button", content: "알림", props: { notiCount: args.notiCount } },
        { type: "button", content: "User Guide" },
        { type: "button", content: "VOC" },
        { type: "button", content: "Confluence" },
        { type: "button", content: "Jira" },
        { type: "divider" },
        { type: "button", content: "Admin" },
        {
          type: "button",
          content: "이삼성",
          props: {
            className: "mr-[-8px]",
            icon: <GearIcon />,
            iconOption: "after",
            onClick: () => {},
          },
        },
        {
          content: <ConfidentialIcon color="dark" />,
          props: {
            className: "ml-auto pl-1 flex flex-col justify-center",
          },
          type: "custom",
        },
      ]}
    />

    {/* Main Layout Container - flex-1으로 남은 공간을 차지하고 min-h-0으로 shrink 허용 */}
    <main className="flex-col-0 flex h-[calc(100vh-40px)] min-h-0 flex-1 overflow-hidden">
      {/* Simple Tree LNB */}

      {/* Content Area */}
      <Page>
        <DetailPageHeader
          title="1.9.2 ERS Title Detail"
          tooltipContent="1.9.2 ERS Title Detail"
          children={<Button size="small">Create SRS</Button>}
          className="border-b border-[var(--color-border-btn-2ndary-border-default)]"
        />

        <div className="flex flex-1 flex-row overflow-hidden">
          <div className="flex w-[461px] shrink-0 flex-col border-r border-[var(--color-border-btn-2ndary-border-default)] bg-[var(--color-bg-surface-tertiary)] px-[16px]">
            <div className="typo-sok-caption-12-400 my-[16px] flex items-center justify-between text-[var(--colors-neutral-neutral-13)]">
              Last Updated: 2025-02-21
              <Button size="small" variant="secondary">
                Version History
              </Button>
            </div>
            <div className="h-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
            <ScrollArea className="typo-sok-body-14-400 my-[10px] overflow-y-auto text-[var(--colors-neutral-neutral-17)]">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
              Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
              ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
              amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914
              translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
              in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
              Latin professor at Hampden-Sydney College.
            </ScrollArea>
          </div>

          <div>
            <div className="typo-sok-caption-12-400 flex h-[53px] items-center border-e border-b border-[var(--color-border-btn-2ndary-border-default)] px-[12px]">
              <div className="font-bold text-[var(--colors-neutral-neutral-15)]">SRS List</div>
              <div className="mx-[8px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
              <div className="text-[var(--colors-neutral-neutral-13)]">Total 10</div>
            </div>
            <Lnb
              className="h-[calc(100vh-150px)] bg-white"
              selectedItemId="analog-feature-2"
              defaultOpenPath={["digital"]}
              data={{
                items: [
                  {
                    id: "analog",
                    content: "Analog",
                    items: [
                      {
                        id: "analog-feature-1",
                        content: "Analog_Feature",
                        type: "item",
                      },
                      {
                        id: "analog-feature-2",
                        content: "Analog_Feature",
                        type: "item",
                      },

                      {
                        id: "analog-feature-3",
                        content: "Analog_Feature",
                        type: "item",
                      },

                      {
                        id: "analog-feature-4",
                        content: "Analog_Feature",
                        type: "item",
                      },

                      {
                        id: "analog-feature-5",
                        content: "Analog_Feature",
                        type: "item",
                      },
                    ],
                  },
                  {
                    id: "digital",
                    content: "Digital",
                    items: [
                      {
                        id: "digital-feature-1",
                        content: "Digital_Feature",
                        type: "item",
                      },
                      {
                        id: "digital-feature-2",
                        content: "Digital_Feature",
                        type: "item",
                      },

                      {
                        id: "digital-feature-3",
                        content: "Digital_Feature",
                        type: "item",
                      },

                      {
                        id: "digital-feature-4",
                        content: "Digital_Feature",
                        type: "item",
                      },

                      {
                        id: "digital-feature-5",
                        content: "Digital_Feature",
                        type: "item",
                      },
                    ],
                  },
                ],
              }}
            />
          </div>
          <div className="flex w-full flex-col overflow-hidden px-[16px] py-[14px]">
            <div className="mt-[3px] mb-[15px] flex flex-row items-center pr-[16px]">
              <div className="typo-sok-h6-14-700 mr-auto">Analog_Feature02</div>
              <Button size="small" className="mr-[6px]">
                Edit
              </Button>
              <Button variant="secondary" size="small">
                Delete
              </Button>
              <div className="mx-[8px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
              <Button variant="secondary" size="small">
                Approve
              </Button>
              <div className="mx-[8px] h-[10px] w-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
              <Button variant="secondary" size="small">
                Version History
              </Button>
            </div>
            <div className="h-[1px] shrink-0 bg-[var(--color-border-border-2-outer)]" />
            <ScrollArea className="scrollbar-thin flex-1 overflow-y-auto">
              <div className="typo-sok-h6-14-700 py-[10px] text-[var(--colors-neutral-neutral-13)]">Information</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[53px]">Index</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="typo-sok-caption-12-400 max-h-[800px] overflow-auto">
                  <TableRow>
                    <TableCell>This is</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Table Sample.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="typo-sok-h6-14-700 py-[10px] text-[var(--colors-neutral-neutral-13)]">Description</div>
              <div className="typo-sok-body-14-400 scrollbar-thin h-[280px] overflow-auto border border-[var(--color-border-btn-2ndary-border-default)] px-[8px] py-[6px]">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
                Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
                undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the
                theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
                sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the
                1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
                Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions
                from the 1914 translation by H. Rackham.
              </div>
              <div className="typo-sok-h6-14-700 flex items-center gap-[6px] py-[10px] text-[var(--colors-neutral-neutral-13)]">
                Support Comment
                <Tooltip place="bottom-start">
                  <TooltipTrigger>
                    <InformationIcon />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-bold">Tooltip Title</p>
                    <p>Tooltip Content</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[53px]">Index</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="typo-sok-caption-12-400 max-h-[800px] overflow-auto">
                  <TableRow>
                    <TableCell>This</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Is</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>A</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Table</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sample.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </Page>
    </main>

    {/* Footer - flex-shrink-0으로 크기 고정 */}
    <Footer
      theme={args.footerTheme}
      size={args.footerSize || "compact"}
      className="flex-shrink-0"
      items={[
        { type: "link", href: "/", content: "Textinputplace" },
        { type: "link", href: "/", content: "개인정보 처리방침" },
        { type: "link", href: "/", content: "이용약관" },
        { type: "copyright", content: "2025 Samsung" },
      ]}
    />
  </div>
)
