#!/bin/bash

arg="$1"

    # Argument help
if [[ "$arg" == "-h" || "$arg" == "-help" || "$arg" == "--help" ]];
then
    echo -e "Bash Script:"
    echo -e "USAGE:"
    echo -e "   ./run.sh            -> Building Back app in docker and launch it"
    echo -e "   ./run.sh update     -> Upgrade package"
    echo -e "   ./run.sh stop       -> Close docker"
    echo -e "   ./run.sh fclean     -> Clean docker-compose"
    exit 0
fi

if [ "$(expr substr $(uname -s) 1 5)" != "Linux" ];
then
    echo -e "\033[0;31m[Warning]: This script is made for Linux !\033[0m"
fi

    # Argument update
if [[ "$arg" == "update" || "$arg" == "upgrade" || "$arg" == "upd" || "$arg" == "upg" || "$arg" == "up" || "$arg" == "u" || "$arg" == "-u" ]];
then
    if [[ ! -d "./.config" || ! -f "./.config/package_back.json" ]]; then
        mkdir -p ./.config/
        cp -f ./package.json ./.config/package_back.json
    fi
    echo -e "\033[0;34m[Start]: Updating package ...\033[0m"
    npm update --silent
    npm audit fix --silent
    touch ./.config/.need_update_docker
    echo -e "\033[0;34m[Done]: Update Done.\033[0m"
    mkdir -p ./.config/
    cp -f ./package.json ./.config/package_back.json
    echo -e "\033[0;32m[Done]: Upgrade All Packages.\033[0m"
    exit 0
fi

    # Argument stop
if [[ "$arg" == "stop" || "$arg" == "close" || "$arg" == "st" || "$arg" == "s" || "$arg" == "-s" ]];
then
    if [[ $(docker ps -a -q) != "" ]]; then
        docker stop $(docker ps -a -q)
        docker rm $(docker ps -a -q)
        docker-compose down
        echo -e "\033[0;32m[Done]: Docker Stopped.\033[0m"
    else
        docker-compose down 2&> /dev/null
        echo -e "\033[0;32m[Done]: Docker nothing to stop.\033[0m"
    fi
    exit 0
fi

    # Argument fclean
if [[ "$arg" == "fclean" || "$arg" == "fclear" || "$arg" == "fcl" || "$arg" == "f" || "$arg" == "-f" ]];
then
    if [[ $(docker ps -a -q) != "" ]]; then
        docker stop $(docker ps -a -q)
        docker rm $(docker ps -a -q)
        docker-compose down
        echo -e "\033[0;32m[Done]: Cleaning Docker.\033[0m"
    else
        docker-compose down 2&> /dev/null
        echo -e "\033[0;32m[Done]: Docker nothing to clear.\033[0m"
    fi
    rm -fr node_modules package-lock.json
    rm -fr .config/
    npm cache clean --force
    echo -e "\033[0;32m[Done]: Cleaning local install.\033[0m"
    exit 0
fi

    # No Argument
reset
if [[ ! -d "./.config/" || ! -f "./.config/package_back.json" ]];
then
    mkdir -p ./.config/
    cp -f ./package.json ./.config/package_back.json
    touch ./.config/.need_update_docker
fi
docker-compose down
if [[ "$(diff ./.config/package_back.json ./package.json)" != "" || -f "./.config/.need_update_docker" ]];
then
    echo -e "\033[0;31m[Warning]: New package detected !\033[0m"
    echo -e "\033[0;34m[Start]: Need Rebuild container.\033[0m"
    mkdir -p ./.config/
    cp -f ./package.json ./.config/package_back.json
    rm -f ./.config/.need_update_docker
    docker-compose up --build
else
    docker-compose up
fi

docker-compose down