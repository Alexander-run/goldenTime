pnpm run build:prod

rm -rf horse
mkdir -p horse/admin
mkdir -p horse/user
mkdir -p horse/apiservice

mv -f frontend/admin-client/dist/* horse/admin
mv -f frontend/user-client/dist/* horse/user
mv -f service/dist/* horse/apiservice
cp -f prod_pm2_config/* horse