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
        object['total'] += value
        return
    object[key] = value
    object['total'] += value


data = get_data('2020')

# Results
# total_amount = 0
grand_totals = {
    'total_amount': 0,
    'cabinet': {'total': 0},
    'department': {'total': 0},
    'fund_category': {'total': 0},
    'fund': {'total': 0},
}
cabinet_list = {}
department_list = {}
fund_category_list = {}
fund_list = {}

# Set up individual months
for num in range(12):
    cabinet_list[str(num + 1)] = {'total': 0}
    department_list[str(num + 1)] = {'total': 0}
    fund_category_list[str(num + 1)] = {'total': 0}
    fund_list[str(num + 1)] = {'total': 0}

# For 2020 this took 4 hours to run
for item in data:
    date = datetime.datetime.strptime(item['journal_date'], '%Y-%m-%dT%H:%M:%S.000')
    amount = int(float(item['amount']) * 100)

    grand_totals['total_amount'] += amount
    add_to_result(item['cabinet'], grand_totals['cabinet'], amount)
    add_to_result(item['department'], grand_totals['department'], amount)
    add_to_result(item['fund_category'], grand_totals['fund_category'], amount)
    add_to_result(item['fund'], grand_totals['fund'], amount)

    month = str(date.month)
    add_to_result(item['cabinet'], cabinet_list[month], amount)
    add_to_result(item['department'], department_list[month], amount)
    add_to_result(item['fund_category'], fund_category_list[month], amount)
    add_to_result(item['fund'], fund_list[month], amount)

out = open("2020.json", "w")

result = {
    'grand_totals': grand_totals,
    'cabinet_list': cabinet_list,
    'department_list': department_list,
    'fund_category_list': fund_category_list,
    'fund_list': fund_list,
}
out.write(json.dumps(result))
out.close()
