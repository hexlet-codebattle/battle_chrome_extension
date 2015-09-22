-module(backend_app).

-behaviour(application).

-export([start/2
         ,stop/1]).

start(_StartType, _StartArgs) ->
    Dispatch = cowboy_router:compile([
                                      { '_', [
                                              { "/ws/api/v1/games", bullet_handler, [{handler, games_handler}]}
                                             ]}
                                     ]),
    {ok, _} = cowboy:start_http(backend, 100, [{port, 8080}], [{env, [{dispatch, Dispatch}]}]),
    backend_sup:start_link().

stop(_State) ->
    ok.
