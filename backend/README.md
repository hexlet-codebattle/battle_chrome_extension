
#Build

    $ make compile

#Run

    $ make run

#Games

###openGame
    gen_server:cast(games, {openGame, gameId})

###StartGame
    gen_server:cast(games, {startGame, gameId})

###finishGame
    gen_server:cast(games, {finishGame, gameId})

gameId - integer
