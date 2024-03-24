// pages/index.tsx
import ProseMirrorEditor from './ProseMirrorEditor'

export const ProseManager = () => {
  const content = `
  <main>
    <div class="page">
      <p>Contenu de la page 1...</p>
    </div>
    <div>
      <p>Contenu de la page 2...</p>
    </div>
  </main>
  `

  return (
    <div>
      <ProseMirrorEditor content={content} />
    </div>
  )
}
