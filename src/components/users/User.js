import React, { useEffect, useContext, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom'
import GithubContext from '../../context/github/githubContext'


const User = ({match }) => {
  const githubContext = useContext(GithubContext);

  const { getUser, loading, user, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, [])

  const { name, avatar_url, location, bio, company, blog, login, html_url, followers, following, public_repos, public_gists, hireable } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-2'>
        Back to search
      </Link>
      Hireable: {''}
      {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" /> }
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} className="round_img" alt="" style={{ width: '150px' }} />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-2 my-1'>Visit github profile</a>
          <ul>
            <li>
              {login && 
                <Fragment>
                  <strong>Username:</strong> {login}
                </Fragment>
              }
            </li>
            <li>
              {company && 
                <Fragment>
                  <strong>Company:</strong> {company}
                </Fragment>
              }
            </li>
            <li>
              {blog && 
                <Fragment>
                  <strong>Website:</strong> {blog}
                </Fragment>
              }
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-1">Followers: {followers}</div>
        <div className="badge badge-2">Following: {following}</div>
        <div className="badge badge-3">Public repos: {public_repos}</div>
        <div className="badge badge-4">Public gists: {public_gists}</div>  
      </div>

      <Repos repos={repos} />
    </Fragment>
  )}

export default User
