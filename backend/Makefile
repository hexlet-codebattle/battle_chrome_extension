PROJECT = backend
REBAR = ./bin/rebar3

all: deps clean compile

deps:
	@$(REBAR) deps

clean:
	@$(REBAR) clean

compile:
	@$(REBAR) compile

run:
	@(erl -pa _build/default/lib/*/ebin -s $(PROJECT))
