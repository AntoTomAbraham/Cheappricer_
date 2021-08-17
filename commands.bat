@ECHO OFF
git remote set-url origin https://cheappricer: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@github.com/cheappricer/Cheappricer_.git
git pull origin main 
git config --global user.email "cheappricer@gmail.com"
git config --global user.name "cheappricer"
git add .
git commit -m "AzureCommit"
git push -u origin main
