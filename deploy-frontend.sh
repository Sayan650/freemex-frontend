
#!/bin/sh
npm run build

if [ $? -eq 0 ]
then
    scp -r ./build/* freemex@ssh.freemex3b.cybercitizen01.ga:/home/freemex/freemex-frontend
else
    echo "Not uploaded, are you in the right repository?"
fi
