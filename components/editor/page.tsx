import { Editor, EditorState } from 'draft-js'
import { useEffect, useRef, useState } from 'react'

/**
 * Représente une feuille d'écriture.
 *
 * Voici les tailles standards en mm:
 *  - format de poche: 108 x 175 mm
 *  - format Trade Paperback: 152 x 229 mm
 *
 * Conversion en pixel selon les dpi (dots per inch) pour l'impression, 300dpi:
 *  - poche: 1275px par 2061px
 *  - Trade Paperback: 1800px par 2700px
 *
 * Conversion en pixel selon les dpi (dots per inch) pour l'impression, 96dpi:
 *  - poche: 408px par 659px
 *  - Trade Paperback: 576px par 864px
 *
 * Le coefficient entre 96dpi et 300dpi est de 3.125.
 * Le coefficient entre la largeur et la hauteur est de 1.5.
 *
 * Marge intérieure:
 *  - poche: 24 à 48 pixels
 *  - Trade Paperback: 150 à 225 pixels
 *
 * Marge extérieure:
 *  - poche: 24 à 48 pixels
 *  - Trade Paperback: 75 à 150 pixels
 *
 * Marge supérieure et inférieure:
 *  - poche: 24 à 48 pixels
 *  - Trade Paperback: 150 à 300 pixels
 */
export const Page = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )
  const editorRef = useRef<HTMLDivElement>(null)
  const ref = useRef<Editor>(null)

  useEffect(() => {
    calculateEditorHeight()
  }, [editorState])

  const calculateEditorHeight = () => {
    if (editorRef.current && ref.current) {
      const contentHeight = ref.current.editor?.offsetHeight || 0
      const containerHeight = editorRef.current.offsetHeight
      const style = getComputedStyle(editorRef.current)
      const paddingTop = parseInt(style.paddingTop, 10)
      const paddingBottom = parseInt(style.paddingBottom, 10)

      if (contentHeight + paddingTop + paddingBottom >= containerHeight) {
        console.log('new page')
      }
    }
  }

  return (
    <div>
      <div
        ref={editorRef}
        className="w-[44rem] h-[66rem] p-6 bg-white shadow-xl text-base overflow-hidden"
        onClick={() => ref.current?.focus()}
      >
        <Editor ref={ref} editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  )
}
