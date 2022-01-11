passes=0
fails=0
date=`date +%Y%m%d%H%M%S`
echo $date
report_file=reports/${date}.txt
videos_folder=reports/videos/${date}
screenshots_folder=reports/screenshots/${date}
cypress_folder=cypress

number_of_times=$2
echo $number_of_times

mkdir -p reports
mkdir -p ${videos_folder}
touch $report_file

for (( i=1; i<=$number_of_times; i++ ))
do
    echo -e '
=================\n
    run: ' $i '\n
=================\n
'
    npx cypress run $1 | tac | sed -n '2 p' | awk '{ printf "run '$i'"; print }'  >> $report_file
    last_line=$(cat $report_file | sed -n '$p')
    
    echo 'result' $last_line
    
    if [[ "$last_line" == *"passed"* ]]
    then
        ((passes+=1))
    else
        ((fails+=1))
        mv ${cypress_folder}/videos/$1.mp4 ${videos_folder}/$i-$1.mp4
        mkdir -p ${screenshots_folder}/$i && mv -v ${cypress_folder}/screenshots/$1/* ${screenshots_folder}/$i/
    fi
done

echo "passes: $passes"
echo "fails: $fails"
