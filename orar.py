import json
from datetime import datetime, timedelta

with open("orar.json") as j:
    orar = json.load(j)

    # Creaza dictionar gol de discipline
    discipline = {k: {} for k in orar.keys()}

    # Creaza disciplinele
    for k, v in orar.items():
        titlu = v.get("titlu")
        subtitlu = ""
        descriere = v.get("descriere")
        imageURL = v.get("imagine")

        iteme = {}

        csl = dict((key, value) for key, value in v.items()
                   if key == "curs" or key == "laborator" or key == "seminar")

        # Efectiv itemele
        for tip, valoare in csl.items():
            for i in range(valoare.get("count")):
                desc = ""
                # Ex: 3D - Cursul 1
                longTitle = "%s - %s %d" % (k, tip.capitalize() + "ul", i + 1)
                dateStart = datetime.strptime(
                    valoare.get("startDate"),
                    '%Y-%m-%dT%H:%M:%SZ') + timedelta(
                        weeks=i * valoare.get("period"))
                dateEnd = dateStart + timedelta(hours=valoare.get("duration"))
                questions = {
                    "q%s%d" % ("c" if tip == "curs" else
                               "l" if tip == "laborator" else "s", d): True
                    for d in range(4)
                }

                iteme[k + "_" + tip + "_%03d" % (i + 1)] = {
                    "dateStart": int(dateStart.timestamp() * 1000),
                    "dateEnd": int(dateEnd.timestamp() * 1000),
                    "descriere": desc,
                    "longTitle": longTitle,
                    "questions": questions,
                    "shortTitle": "%sul %d" % (tip.capitalize(), i + 1),
                    "type": tip
                }

        discipline[k]["descriere"] = descriere
        discipline[k]["imageURL"] = imageURL
        discipline[k]["subtitlu"] = subtitlu
        discipline[k]["titlu"] = titlu
        discipline[k]["iteme"] = iteme

with open("output.json", "w") as f:
    json.dump(discipline, f, sort_keys=True, indent=4)
