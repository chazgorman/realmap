import dynamic from 'next/dynamic'

const DynamicMap = dynamic(import('../src/map'),
{
  ssr: false
})

export default () => (
  <div>
    <DynamicMap />
  </div>
)