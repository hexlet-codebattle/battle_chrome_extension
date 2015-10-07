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
    BuildLangs = [ [ {lang, <<"Ruby">>}, {passed, true} ] ],
    GameMember = [[{username, <<"FirstPlayer">>}, {lang, <<"Ruby">>}]],
    GameInfo = [{id, GameId}, {challenge_build, [{level, <<"easy">>}]}, {build_langs, BuildLangs} ],
    GameProcess = [{state, <<"opened">>}],
    Data = [{members, GameMember}, {game, GameInfo}, {game_process, GameProcess}],
    Reply = [{handler, opened}, {data, Data}],
    {reply, jsx:encode(Reply), Req, State};

info({game, started, GameId}, Req, State) ->
    Members = [
                   [{username, <<"FirstPlayer">>}, {lang, <<"Ruby">>}],
                   [{username, <<"SecondPlayer">>}, {lang, <<"Erlang">>}]
                  ],
    GameInfo = [{id, GameId}],
    GameProcess = [{state, <<"started">>}],
    Data = [{game, GameInfo}, {game_process, GameProcess}, {members, Members}],
    Reply = [{handler, started}, {data, Data}],
    {reply, jsx:encode(Reply), Req, State};

info({game, finished, GameId}, Req, State) ->
    GameInfo = [{id, GameId}],
    GameProcess = [{state, <<"finished">>}],
    Data = [{game, GameInfo}, {game_process, GameProcess}],
    Reply = [{handler, finished}, {data, Data}],
    {reply, jsx:encode(Reply), Req, State};

info(Msg, Req, State) ->
    {reply, Msg, Req, State}.

terminate(_Req, _State) ->
    ok.

