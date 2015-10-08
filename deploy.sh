# build meteor
echo "Building meteor..."
meteor build .build --server $2

# deploy to TestFlight if 'beta'
if [[ $1 = "beta" ]]; then
  echo "Deploying to TestFlight..."
  fastlane ios beta
# deploy to Hocker if 'hockey'
elif [[ $1 = "hockey" ]]; then
  echo "Deploying to Hockey..."
  fastlane ios hockey
# deploy to production if 'deploy'
elif [[ $1 = "deploy" ]]; then
  echo "Deploying to production..."
  fastlane ios deploy
else
  echo "Done"
fi
