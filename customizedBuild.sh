pnpm run build:prod

mkdir -p horse/admin
mkdir -p horse/user
mkdir -p horse/apiservice

mv -f frontend/admin-client/dist/* horse/admin
mv -f frontend/user-client/dist/* horse/user
mv -f service/dist/* horse/apiservice
mv -f prod_pm2_config/* horse