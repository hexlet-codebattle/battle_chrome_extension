-module(backend).

-export([start/0, stop/0, restart/0, subscribe/0]).

subscribe() ->
    gen_server:cast(games, {subscribe, self()}).

start() ->
    {ok, _ } = application:ensure_all_started(?MODULE).

stop() ->
    Apps  = [ ranch, cowboy, backend],
    [application:stop(App) || App <- Apps],
    ok.

restart() ->
    ok.
