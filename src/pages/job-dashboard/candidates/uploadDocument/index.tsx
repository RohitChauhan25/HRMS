import { documentData } from 'constants/documentData'

const Upload = () => {
  return (
    <div>
      {documentData.map((data, index: number) => {
        return (
          <div key={index}>
            <label htmlFor="">{data.name}</label>
            <br />
            <input type="file" />
            <br />
          </div>
        )
      })}
    </div>
  )
}

export default Upload
