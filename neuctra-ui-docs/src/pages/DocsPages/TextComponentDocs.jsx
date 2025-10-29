import React from 'react'
import CodeBlock from '../../components/Docs/CodeBlock'

const TextComponentDocs = () => {
  return (
    <CodeBlock
  language="jsx"
  code={`
    function Hello() {
      return <h1 style={{ color: '#00c420' }}>Hello Neuctra 🚀</h1>;
    }
    render(<Hello />);
  `}
/>

  )
}

export default TextComponentDocs