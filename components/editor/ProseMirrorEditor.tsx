import { DOMParser, Node, Schema } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { useEffect, useRef } from 'react'

interface ProseMirrorEditorProps {
  content: string
}

const ProseMirrorEditor: React.FC<ProseMirrorEditorProps> = ({ content }) => {
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const editorViewRef = useRef<EditorView>()

  useEffect(() => {
    if (!editorContainerRef.current) return

    // Convertir la chaîne de caractères HTML en un objet DOM
    const contentElement = document.createElement('div')
    contentElement.innerHTML = content

    const trivialSchema = new Schema({
      nodes: {
        doc: {
          content: 'container',
        },
        container: {
          content: 'page+',
          toDOM(node) {
            return ['main', { class: 'flex flex-col gap-6' }, 0]
          },
          parseDOM: [{ tag: 'main' }],
        },
        page: {
          content: 'paragraph+',
          toDOM(node) {
            return [
              'div',
              {
                class:
                  'w-[44rem] h-[66rem] p-6 bg-white shadow-xl text-base overflow-hidden',
              },
              0,
            ]
          },
        }, // Chaque page peut contenir des blocs (paragraphes, listes, etc.)
        paragraph: {
          content: 'text*',
          toDOM(node) {
            return ['p', 0]
          },
        }, // Les paragraphes peuvent contenir du texte
        text: {}, // Définition du type de nœud pour le texte
      },
    })

    // Passer l'objet DOM au parseur DOM de ProseMirror
    const parsedContent = DOMParser.fromSchema(trivialSchema).parse(
      contentElement,
    ) as Node

    const state = EditorState.create({
      schema: trivialSchema,
      doc: parsedContent,
    })

    const editorView = new EditorView(editorContainerRef.current, {
      state,
    })

    editorViewRef.current = editorView

    return () => {
      editorView.destroy()
    }
  }, [])

  return <div ref={editorContainerRef} />
}

export default ProseMirrorEditor
