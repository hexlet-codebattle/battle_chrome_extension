-module(games_handler).

-export([init/4, stream/3, info/3, terminate/2]).

init(_Tranport, Req, _Opts, _Active) ->
    backend:subscribe(),
    {ok, Req, no_state}.

stream(<<"ping">>, Req, State) ->
    {ok, Req, State};

stream(Msg, Req, State) ->
    {reply, Msg, Req, State}.

info({game, opened, GameId}, Req, State) ->
    ExtendedLangs = [ [ {lang, <<"Ruby">>}, {passed, true} ] ],
    PlayerInfo = [{nickname, <<"FirstPlayer">>}, {lang, <<"Ruby">>}],
    GameInfo = [{level, 1}],
    Data = [{id, GameId}, {player, PlayerInfo}, {game, GameInfo}, {extended_langs, ExtendedLangs}],
    Reply = [{handler, openGame}, {data, Data}],
    {reply, jsx:encode(Reply), Req, State};

info({game, started, GameId}, Req, State) ->
    PlayerInfos = [
                   [{nickname, <<"FirstPlayer">>}, {lang, <<"Ruby">>}],
                   [{nickname, <<"SecondPlayer">>}, {lang, <<"Erlang">>}]
                  ],
    Data = [{id, GameId}, {players, PlayerInfos}],
    Reply = [{handler, startGame}, {data, Data}],
    {reply, jsx:encode(Reply), Req, State};

info({game, finished, GameId}, Req, State) ->
    Data = [{id, GameId}],
    Reply = [{handler, finishGame}, {data, Data}],
    {reply, jsx:encode(Reply), Req, State};

info(Msg, Req, State) ->
    {reply, Msg, Req, State}.

terminate(_Req, _State) ->
    ok.

