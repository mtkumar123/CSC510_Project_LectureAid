import shutil
import pyfiglet
import sys
from code.extract_sizes import extract_words, text_to_groupings
import code.wordprocessing as wp
from code.google_search import get_people_also_ask_links
import concurrent.futures
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from code.browser_output import *


def menu_display():
    format_welcome_message = pyfiglet.figlet_format("LECTURE AID")
    size = shutil.get_terminal_size(fallback=(120, 50))

    print(format_welcome_message.center(size.columns) +
          """Welcome to Lecture Aid. Choose from the following options:
Option 1: Press 1 to enter the file location you would like Lecture Aid to help you find resources on.
Option 2: Press 2
Press Q to quit the program.
""")


def user_menu():
    """

    Runner class. Prompts the user for input and returns a txt file of results

    """
    menu_display()

    valid_choices = ["1", "2", "Q", "q"]
    while True:
        choice = input("Please Enter your choice: ")[0]
        if choice in valid_choices:
            break
        else:
            print("That choice is not available now. Please try again")
            continue

    if choice == valid_choices[0]:
        file = input("Please enter the path to the file: ")
        return file

    elif choice == valid_choices[1]:
        input("")

    elif (choice == valid_choices[-1] or choice == valid_choices[-2]):
        print("Thank you for using Lecture Aid. Closing Program now.")
        sys.exit(0)


def generate_wordcloud(keyword_data: list, file: str) -> None:
    """
    Given keywords of a document, display a wordcloud.

    :param keyword_data: List of cleaned keywords in a document
    :type: list
    :param file: The name of the lecture document
    :type: str
    :rtype: None
    :return: None
    """
    wordcloud_string = ''
    for slide in keyword_data:
        # get the header keywords
        curr_slide_keywords = ' '.join(slide['Header_keywords']) + ' '
        # if the words showed up multiple times, duplicate it
        curr_slide_keywords *= len(slide['slides'])
        # get the paragraph keywords
        curr_slide_keywords += ' '.join(slide['Paragraph_keywords']) + ' '
        wordcloud_string += curr_slide_keywords

    wordcloud = WordCloud().generate(wordcloud_string)
    # gets the filename by choosing the last word split by /
    # then selects everything but .pdf
    formatted_name = file.split("/")[-1].replace(".pdf", "")

    plt.figure(figsize=(8, 8), facecolor=None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.title(f'Wordcloud for {formatted_name}')
    plt.tight_layout(pad=0)
    plt.savefig(f'{formatted_name}.png')
    global WORDCLOUD_FILE_NAME
    WORDCLOUD_FILE_NAME = formatted_name + ".png"


if __name__ == "__main__":
    file = user_menu()
    raw_data = extract_words(file)
    raw_data = text_to_groupings(raw_data)
    keyword_data = wp.extract_noun_chunks(raw_data)
    keyword_data = wp.merge_slide_with_same_headers(keyword_data)

    # generate a wordcloud
    generate_wordcloud(keyword_data, file)

    keyword_data = wp.duplicate_word_removal(keyword_data)
    search_query = wp.construct_search_query(keyword_data)
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        # when testing use searchquery[:10 or less]. Still working on better threading to get faster results
        results = executor.map(get_people_also_ask_links, search_query[:3])

    with open("results.txt", mode="w") as f:
        for result in results:
            for qa in result:
                f.write("Question: {}".format(qa["Question"]) + "\n")
                f.write("Answer Link: {}".format(qa["Answer"]) + "\n")
            f.write("\n\n")

    showResult(WORDCLOUD_FILE_NAME)
