import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Octokit } from '@octokit/rest';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import classnames from 'classnames';

import styles from './About.module.css';


const About = () => {

  const octokit = new Octokit();

  const login = 'OlgaVinogradova';
  const initialState = {
    isLoading: true,
    reposList: [],
    name: '',
    avatarUrl: '',
    htmlUrl: '',
    bio: '',
    firstRepo: 0,
    lastRepo: 3,
    error: ''
  };

  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [reposList, setReposList] = useState(initialState.reposList);
  const [name, setName] = useState(initialState.name);
  const [avatarUrl, setAvatarUrl] = useState(initialState.avatarUrl);
  const [htmlUrl, setHtmlUrl] = useState(initialState.htmlUrl);
  const [bio, setBio] = useState(initialState.bio);
  const [error, setError] = useState(initialState.error);
  const [firstRepo, setFirstRepo] = useState(initialState.firstRepo);
  const [lastRepo, setLastRepo] = useState(initialState.lastRepo);


  useEffect(() => {
    setTimeout(() => {
      octokit.repos.listForUser({
        username: login,
      })
        .then((repositories) => {
          setReposList(repositories.data);
          setIsLoading(false);
        }).catch((err) => {
          setError(err);
          setIsLoading(false);
        });
      octokit.users.getByUsername({
        username: login
      })
        .then((userData) => {
          setName(userData.data.name);
          setAvatarUrl(userData.data.avatar_url);
          setHtmlUrl(userData.data.html_url);
          setBio(userData.data.bio);
        }).catch((err) => {
          setError(err);
        });
    }, 2000);
  }, []);

  const onClickNext = () => {
    setFirstRepo((firstRepo) => firstRepo + 3);
    setLastRepo((lastRepo) => lastRepo + 3);
  };

  const onClickBack = () => {
    setFirstRepo((firstRepo) => firstRepo - 3);
    setLastRepo((lastRepo) => lastRepo - 3);
  };

  const repoPag = reposList.slice(firstRepo, lastRepo);

  return (
    <div>
      { isLoading ? <CircularProgress style={{ display: 'block', margin: 'auto' }} /> : error ? <span>Ошибка</span> :
        <div className={styles.wrap}>
          <div className={styles.info_wrap}>
            <div className={styles.avatar}>
              <img className={styles.userAvatar} src={avatarUrl} alt='avatar' />
            </div>
            <div className={styles.userInfo}>
              <div>
                <h2 className={styles.name}>{name ? name : login}</h2>
                <p className={styles.bio}>{bio}</p>
                <p><a href='mailto: vinogradova.ya.olga@yandex.ru' className={styles.contactslLink}>
                  <AlternateEmailIcon style={{ fontSize: 14, marginRight: 5, marginBottom: -2 }} className={styles.mail} />
                    vin.olga.ya@yandex.ru
                </a></p>
                <p><a href="tg://resolve?domain=OlyKoch" className={styles.contactslLink}>
                  <TelegramIcon style={{ fontSize: 14, marginRight: 5 }} className={styles.teleg} />
                    +7(960)171-78-22
                </a></p>
              </div>
              <div className={styles.socialNetwork}>
                <a rel='noopener noreferrer' target='_blank' href="https://vk.com/olenkiss" className={styles.vk}>
                </a>
                <a rel='noopener noreferrer' target='_blank' href={htmlUrl} className={styles.mediaLink}>
                  <GitHubIcon style={{ fontSize: 24, color: 'darkSlateBlue' }} name='gh' className={styles.gh} />
                </a>
                <a href="https://www.instagram.com/malish_kochubey/" rel='noopener noreferrer' target='_blank' className={styles.mediaLink}>
                  <InstagramIcon style={{ fontSize: 26, color: 'darkSlateBlue' }} name='instagram' className={styles.inst} />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.repo_wrap}>
            <h3 className={styles.repo_text}>Мои репозитории:</h3>
            {reposList.length > 0 && <ul className={styles.repolist}>
              {repoPag.map((repo) => (
                <li
                  className={styles.list_item}
                  key={repo.id}
                >
                  <a
                    className={styles.repo_link}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >{repo.name}</a>
                  <div className={styles.repo_info}>
                    <span className={classnames({
                      [styles.language]: true,
                      [styles.html]: repo.language === 'HTML',
                      [styles.css]: repo.language === 'CSS',
                      [styles.js]: repo.language === 'JavaScript',
                      [styles.no_lang]: repo.language === null
                    })}>
                      {repo.language}
                    </span>
                    <div>
                      <span className={styles.fork}>{repo.forks_count}</span>
                      <span className={styles.star}>{repo.stargazers_count}</span>
                    </div>
                    <span className={styles.date}>updated: {new Date(repo.updated_at).toLocaleString('en-US',
                      {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>}
            {reposList.length === 0 && <div className={styles.repoNone}>
              <h2 className={styles.repoNoneTitle}>Репозитории отсутствуют</h2>
            </div>
            }
            {reposList.length > 3 && <div className={styles.buttonWrap}>
              <button className={styles.button} disabled={firstRepo === 0} onClick={() => onClickBack()}>Назад</button>
              <button className={styles.button} disabled={reposList.length - lastRepo <= 0} onClick={() => onClickNext()}>Далее</button>
            </div>}
          </div>
        </div>
      }
    </div >
  );
};

export default About;
