passes=0
fails=0
date=`date +%Y%m%d%H%M%S`
echo $date
report_file=reports/${date}.txt

number_of_times=$2
echo $number_of_times

touch $report_file

for (( i=1; i<=$number_of_times; i++ ))
do
    echo 'run: ' $i
    npx cypress run $1 | tac | sed -n '2 p' >> $report_file
    last_line=$(cat $report_file | sed -n '$p')
    
    echo $last_line
    
    if [[ "$last_line" == *"passed"* ]]
    then
        ((passes=passes+1))
    else
        ((fails=fails+1))
    fi
done

echo "passes: $passes"
echo "fails: $fails"
