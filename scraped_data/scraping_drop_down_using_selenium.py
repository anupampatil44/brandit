from selenium import webdriver
from selenium.webdriver.support.select import Select
import time
from pyvirtualdisplay import Display
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By


# function to tell the code to wait for a particular event to happen
def find(driver_1):
    element = driver_1.find_elements_by_id("data")
    if element:
        return element
    else:
        return False


base_url = "https://on-pointstrategies.com/taglines/"

driver = webdriver.Chrome()  # launch successful
driver.maximize_window()
driver.get(base_url)
driver.implicitly_wait(10)

# category
drop_down_menu_1 = driver.find_element(By.ID, "category_id")
sel_1 = Select(drop_down_menu_1)

# sub-category
drop_down_menu_2 = driver.find_element(By.ID, "sub_category_id")
sel_2 = Select(drop_down_menu_2)

sel_1.select_by_visible_text('Agriculture')  # text that is visible on the web page option
print("Selected Agriculture")
time.sleep(5)

driver.implicitly_wait(20)
sel_2.select_by_visible_text('Agribusiness')  # text that is visible on the web page option
print("Selected Agribusiness")
time.sleep(2)

driver.implicitly_wait(10)
# find all the possible category options
category_options_list = []
for i in sel_1.options:
    category_options_list.append(i.text)

print(category_options_list)

# subcategory value is going to be different for all categories
# make a dictionary to store sub categories for every category

cat_sub_cat_dict = dict()
for i in category_options_list:
    sel_1.select_by_visible_text(i)  # text that is visible on the web page option, for category 1
    sub_category_options_list = []  # for every category there will a new list
    driver.implicitly_wait(10)  # give some time delay for the option to get selected and subcategory list to appear
    for j in sel_2.options:
        sub_category_options_list.append(j.text)
    cat_sub_cat_dict[i] = sub_category_options_list

print("Dictionary created")
print(cat_sub_cat_dict)
print("Bye")


