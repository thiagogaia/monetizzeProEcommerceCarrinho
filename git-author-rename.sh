#!/bin/sh

git filter-branch --env-filter 'if [ "$GIT_AUTHOR_EMAIL" = "thiago.gaia@monetizze.com.br" ]; then
GIT_AUTHOR_EMAIL="thiagogaia@gmail.com";
GIT_AUTHOR_NAME="Thiago Gaia"
GIT_COMMITTER_EMAIL=$GIT_AUTHOR_EMAIL;
GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"; fi' -- --all
