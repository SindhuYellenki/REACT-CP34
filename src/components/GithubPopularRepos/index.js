import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class GithubPopularRepos extends Component {
  state = {
    activeTabId: 'All',
    reposList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {reposList, activeTabId, apiStatus} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    console.log(apiUrl)
    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateActiveTabId = id => {
    this.setState({activeTabId: id}, this.getRepos)
  }

  renderSuccess = reposList => (
    <ul className="reposListContainer">
      {reposList.map(each => (
        <RepositoryItem details={each} key={each.id} />
      ))}
    </ul>
  )

  renderFailure = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
    />
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {apiStatus, reposList} = this.state
    console.log(apiStatus, reposList)
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="listContainer">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              details={each}
              key={each.id}
              updateActiveTabId={this.updateActiveTabId}
            />
          ))}
        </ul>
        {apiStatus === 'SUCCESS' && this.renderSuccess(reposList)}
        {apiStatus === 'FAILURE' && this.renderFailure()}
        {apiStatus === 'IN_PROGRESS' && this.renderLoader()}
      </div>
    )
  }
}

export default GithubPopularRepos
