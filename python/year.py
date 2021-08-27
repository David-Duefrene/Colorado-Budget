import datetime
import json

from sodapy import Socrata

client = Socrata('data.colorado.gov', None, timeout=120)


def get_data(year):
    pattern = f"journal_date between '{year}-01-01' and '{year}-12-31'"
    results = client.get_all("rifs-n6ib", where=pattern)
    return results


def add_to_result(key, object, value):
    if key in object:
        object[key] += value
        return
    object[key] = value


data = get_data('2020')

# Results
total_amount = 0
cabinet_list = {}
department_list = {}
fund_category_list = {}
fund_list = {}

# Set up individual months
for num in range(12):
    cabinet_list[str(num + 1)] = {}
    department_list[str(num + 1)] = {}
    fund_category_list[str(num + 1)] = {}
    fund_list[str(num + 1)] = {}

# For 2020 this too 4 hours to run
for item in data:
    date = datetime.datetime.strptime(item['journal_date'], '%Y-%m-%dT%H:%M:%S.000')
    amount = int(float(item['amount']) * 100)
    total_amount += amount
    month = str(date.month)
    add_to_result(item['cabinet'], cabinet_list[month], amount)
    add_to_result(item['department'], department_list[month], amount)
    add_to_result(item['fund_category'], fund_category_list[month], amount)
    add_to_result(item['fund'], fund_list[month], amount)

out = open("test.json", "w")

result = {
    'total_amount': total_amount,
    'cabinet_list': cabinet_list,
    'department_list': department_list,
    'fund_category_list': fund_category_list,
    'fund_list': fund_list,
}
out.write(json.dumps(result))
out.close()
