import cx from 'classnames';

const OpenedGame = (props) => {
  const message = props.message;
  let href = 'http://wddx.ru/games/' + message.id + '/join';

  return (
    <div>
      {message.game.level + ' ' + message.player.lang + ' game by '} <a href='#'>{message.player.nickname}</a>.

      <p>
        join as:
        {message.extended_langs.map((langInfo) => {
          href = href + '?lang=' + langInfo.lang;
          const classes = cx({game_passed_link: langInfo.passed});

          return (
            <span className='join-lang'>
              <a href={href} target='_blank' className={classes}>{langInfo.lang}</a>
            </span>
            );
        }, this)}
      </p>
    </div>
  );
};

export default OpenedGame;
