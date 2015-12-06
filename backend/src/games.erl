-module(games).

-behaviour(gen_server).

-export([start_link/0, init/1, terminate/2, handle_call/3, handle_cast/2, handle_info/2, code_change/3]).

-record(state, {pids, games}).

start_link() ->
    gen_server:start_link(?MODULE, [], []).

init(_Args) ->
    register(?MODULE, self()),
    Pids = ets:new(pids, []),
    Games = ets:new(games, []),
    {ok, #state{pids = Pids, games = Games}}.

handle_call(_Req, _From, State) ->
    {noreply, State}.

handle_cast({subscribe, Pid} = _Req, #state{pids = Pids, games = Games} = State) ->
    ets:insert(Pids, {Pid}),
    [Pid ! {game, Type, GameId} || {Type, GameId} <- ets:tab2list(Games)],
    {noreply, State};

handle_cast({openGame, GameId} = _Req, #state{pids = Pids, games = Games} = State) ->
    [Pid ! {game, opened, GameId} || {Pid} <- ets:tab2list(Pids)],
    ets:insert(Games, {opened, GameId}),
    {noreply, State};

handle_cast({finishGame, GameId} = _Msg, #state{pids=Pids, games = Games} = State) ->
    ets:match_delete(Games, {opened, GameId}),
    ets:match_delete(Games, {started, GameId}),
    [Pid ! {game, finished, GameId} || {Pid} <- ets:tab2list(Pids)],
    {noreply, State};

handle_cast({startGame, GameId} = _Msg, #state{pids=Pids, games = Games} = State) ->
    [Pid ! {game, started, GameId} || {Pid} <- ets:tab2list(Pids)],
    ets:match_delete(Games, {opened, GameId}),
    ets:insert(Games, {started, GameId}),
    {noreply, State};

handle_cast(Msg, #state{pids=Pids} = State) ->
    [Pid ! Msg || {Pid} <- ets:tab2list(Pids)],
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, _State) ->
    ok.

code_change(_OldVsn, State, _Extra) ->
    {ok, State}.
