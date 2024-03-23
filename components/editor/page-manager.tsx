import { DOMParser } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { useState } from 'react'
import { Page } from './page'

export const PageManager = () => {
  const [pages, setPages] = useState<EditorState[]>([
    EditorState.create({
      doc: DOMParser.fromSchema(schema).parse(document.createElement('div')),
      schema,
    }),
  ])

  const addPageIfNeeded = (pageIndex: number) => {
    console.log('pageIndex = ', pageIndex)
    console.log('pages.lenght = ', pages.length)
    if (pageIndex === pages.length - 1) {
      const newPages = [
        ...pages,
        EditorState.create({
          doc: DOMParser.fromSchema(schema).parse(
            document.createElement('div'),
          ),
          schema,
        }),
      ]
      setPages(newPages)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {pages.map((editorState, index) => (
        <Page
          key={index}
          editorState={editorState}
          onAddPage={() => addPageIfNeeded(index)}
        />
      ))}
    </div>
  )
}
