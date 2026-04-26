from flask import Flask, render_template, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}


def scrape_berlin_jobs(term):
    url = f"https://berlinstartupjobs.com/skill-areas/{term}/"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    jobs = []
    job_cards = soup.select("li.bjs-jlid")

    for job in job_cards:
        title = job.select_one("h4")
        company = job.select_one(".bjs-jlid__b")
        link = job.select_one("a")

        jobs.append({
            "site": "Berlin Startup Jobs",
            "title": title.get_text(strip=True) if title else "No title",
            "company": company.get_text(strip=True) if company else "No company",
            "link": link["href"] if link and link.has_attr("href") else url
        })

    return jobs


def scrape_weworkremotely_jobs(term):
    url = f"https://weworkremotely.com/remote-jobs/search?utf8=%E2%9C%93&term={term}"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    jobs = []
    job_cards = soup.select("section.jobs li")

    for job in job_cards:
        if "view-all" in job.get("class", []):
            continue

        title = job.select_one("span.title")
        company = job.select_one("span.company")
        link = job.select_one("a")

        if title and company and link:
            job_link = link["href"]
            if job_link.startswith("/"):
                job_link = "https://weworkremotely.com" + job_link

            jobs.append({
                "site": "We Work Remotely",
                "title": title.get_text(strip=True),
                "company": company.get_text(strip=True),
                "link": job_link
            })

    return jobs


def scrape_web3_jobs(term):
    url = f"https://web3.career/{term}-jobs"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    jobs = []
    job_cards = soup.select("tr.table_row")

    for job in job_cards:
        title = job.select_one("h2")
        company = job.select_one("h3")
        link = job.select_one("a")

        if title and link:
            job_link = link["href"]
            if job_link.startswith("/"):
                job_link = "https://web3.career" + job_link

            jobs.append({
                "site": "Web3 Career",
                "title": title.get_text(strip=True),
                "company": company.get_text(strip=True) if company else "No company",
                "link": job_link
            })

    return jobs


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/search")
def search():
    term = request.args.get("term")

    if not term:
        return render_template("index.html")

    berlin_jobs = scrape_berlin_jobs(term)
    wwr_jobs = scrape_weworkremotely_jobs(term)
    web3_jobs = scrape_web3_jobs(term)

    jobs = berlin_jobs + wwr_jobs + web3_jobs

    return render_template("index.html", jobs=jobs, term=term)


if __name__ == "__main__":
    app.run(debug=True)