import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {
    id,
    name,
    issues,
    starsCount,
    forksCount,
    avatarUrl,
    issuesCount,
  } = details
  return (
    <li className="repoListItem">
      <img className="image" src={avatarUrl} alt={name} />
      <h1>{name}</h1>
      <div className="horizontal">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="smallImage"
        />
        <p>{issuesCount} open issues</p>
      </div>
      <div className="horizontal">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="smallImage"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="horizontal">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="smallImage"
        />
        <p>{starsCount} stars</p>
      </div>
    </li>
  )
}

export default RepositoryItem
