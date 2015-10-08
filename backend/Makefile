PROJECT = backend
REBAR = ./bin/rebar3

all: deps clean compile

deps:
	@$(REBAR) deps

clean:
	@$(REBAR) clean

compile:
	@$(REBAR) release

run:
	./_build/default/rel/backend/bin/backend console
