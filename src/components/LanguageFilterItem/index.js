import './index.css'

const LanguageFilterItem = props => {
  const {details, updateActiveTabId} = props
  const {id, language} = details

  const onClickButton = () => {
    updateActiveTabId(id)
  }
  return (
    <li className="listItem">
      <button type="button" onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
