#!/bin/sh

# SET COLORS
CIANO='\033[1;36m'
FIMCIANO='\033[0m'

VERDE='\033[0;32m'
FIMVERDE='\033[0m'

echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Este é um script de instalação da Ducktetive!"
echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Este script irá instalar os seguintes itens na sua máquina: Docker, Imagem MySQL e uma execução java"
echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Deseja continuar? [S/N]"
read choice

if [ "$choice" = "S" ] || [ "$choice" = "s" ]; then

    # Instalando docker e em seguida habilitando ele
    echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Instalando (não desligue o computador)"
    sudo apt install docker.io -y
    echo -e "${VERDE}Docker instalado.${FIMVERDE}"  

    sleep 15

    echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Iniciando docker"
    sudo systemctl start docker
    sudo systemctl enable docker
    echo -e "${VERDE}Docker iniciado.${FIMVERDE}"

    sleep 15

    # Verificando se existe o container ducktetive
    if docker ps -a --format '{{.Names}}' | grep -q '^Ducktetive$'; then
        sudo docker exec -i Ducktetive mysql -u root -p001Ducktetive -e "DROP DATABASE IF EXISTS Ducktetive" # Caso exista o banco já criado -> delete
        sudo docker rm -f Ducktetive
        echo "O container Ducktetive foi removido."
    fi

    sleep 5

    # Verificando se a imagem SQL está instalada
    if docker image inspect mysql:5.7 &> /dev/null; then
        echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Instalando MySQL 5.7"
        sudo docker pull mysql:5.7
        echo -e "${VERDE}Imagem SQL instalado.${FIMVERDE}"
    else
        echo "MySQL já existente"
    fi

    # Criando e executando o container docker
    echo -e "${CIANO}[BOT-Script]:${FIMCIANO} criando container"
    sudo docker run -d -p 3306:3306 --name performee -e "MYSQL_ROOT_PASSWORD=Ducktetive100" mysql:5.7
    echo -e "${VERDE}Container criado.${FIMVERDE}"

    sleep 15

    # Executando script SQL
    echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Executando script SQL"
    sudo docker exec -i Ducktetive mysql -u root -pDucktetive100 -h localhost < /home/ubuntu/infra-scripts/Ducktetive.sql
    echo -e "${VERDE}Script MySQL executado.${FIMVERDE}"

    sleep 15
    clear

    echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Dando permissão para executar o script Java e Python"
    chmod +x api-looca.sh
    echo -e "${VERDE}Permissão concedida.${FIMVERDE}"

    sleep 5

    echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Executando script java..."
    ./api-looca.sh

    clear
else
    echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Você não concordou com a instalação docker. Saindo..."
    exit 0

fi