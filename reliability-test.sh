passes=0
fails=0
date=`date +%Y%m%d%H%M%S`
echo $date
report_file=reports/${date}.txt

touch $report_file

for (( i=1; i<=5; i++ ))
do
echo 'run: ' $i
npx cypress run | tac | sed -n '2 p' >> $report_file
echo "ran"
done
