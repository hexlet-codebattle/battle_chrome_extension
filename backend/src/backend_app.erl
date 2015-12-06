-module(backend_app).

-behaviour(application).

-export([start/2
         ,stop/1]).

start(_StartType, _StartArgs) ->
    {_, ApiPath} = application:get_env(backend, api_path),
    {_, Port} = application:get_env(backend, port),
    Dispatch = cowboy_router:compile([
                                      { '_', [
                                              { ApiPath, bullet_handler, [{handler, games_handler}]}
                                             ]}
                                     ]),
    {ok, _} = cowboy:start_http(backend, 100, [{port, Port}], [{env, [{dispatch, Dispatch}]}]),
    backend_sup:start_link().

stop(_State) ->
    ok.
