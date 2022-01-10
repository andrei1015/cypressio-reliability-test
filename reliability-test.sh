passes=0
fails=0
date=`date +%Y%m%d%H%M%S`
echo $date
report_file=reports/${date}.txt

touch $report_file

for (( i=1; i<=5; i++ ))
do
npx cypress run | sed -n '2p'
echo "ran"
done
