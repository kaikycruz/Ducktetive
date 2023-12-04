#!/bin/bash

CIANO='\033[1;36m'
FIMCIANO='\033[0m'

VERDE='\033[0;32m'
FIMVERDE='\033[0m'

VERMELHO='\033[0;31m'
FIMVERMELHO='\033[0m'


# jar_path="api-ducktetive/api-looca-1.0-SNAPSHOT-jar-with-dependencies.jar"
jar="api-looca-1.0-SNAPSHOT-jar-with-dependencies.jar"


echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Este script é responsável pela instalação da solução Ducktetive em JAVA!"
echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Deseja continuar? [S/N]"
read choice

if [ "$choice" = "S" ] || [ "$choice" = "s" ]; then

    # Verificando se o JAVA está instalado e se está atualizado
    if ! command -v java &> /dev/null || ! java --version | grep -q "openjdk 17"; then
        echo -e "${CIANO}[BOT-Script]:${FIMCIANO} JAVA não encontrado ou desatualizado."
        sleep 5
        sudo add-apt-repository ppa:linuxuprising/java -y
        echo "Atualizando os pacotes."
        sleep 5
        sudo apt update -y

        echo "Instalando o JAVA."
        sleep 5
        sudo apt-get install openjdk-17-jdk -y
        echo "Java 17 instalado! Atualizando..."
        sleep 5
        sudo apt update && sudo apt upgrade -y
    else
        echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Máquina possui o JAVA."
    fi

    echo -e "${VERDE}Buscando JAR para execução...${FIMVERDE}"

    sleep 8
    clear

    echo "Executando JAR"
    sudo chmod +x $jar
    sudo java -jar $jar
    if [ $? -eq 0 ]; then
        echo -e "${VERDE}Executado com sucesso.${FIMVERDE}"
    else
        echo -e "${VERMELHO}Erro ao executar o JAR.${FIMVERMELHO}"
        exit 1
    fi

    echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Instalação concluida!"

else
    echo -e "${CIANO}[BOT-Script]:${FIMCIANO} Instalação cancelada"
    exit 0
fi