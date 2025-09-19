import { useState } from "react";
import { X } from "lucide-react"; // icon for close

const servicesList = [
  "69 (69 sex position)",
  "Anal Rimming (Licking anus)",
  "BDSM (receiving)",
  "Body Worship",
  "CIM (Cum in mouth)",
  "COF (Cum on face)",
  "DFK (Deep french kissing)",
  "Domination (receiving)",
  "Erotic massage",
  "Face Sitting",
  "Fisting (giving)",
  "Foot Fetish",
  "Gang Bang",
  "Golden shower",
  "Scat (giving)",
  "Humiliation (giving)",
  "Lap dancing",
  "Massage",
  "Modelling",
  "Smoking (Fetish)",
  "A-Level (Anal sex)",
  "Pegging",
  "Sub games",
  "Swallow",
  "Swallow (at discretion)",
  "Tantric Massage",
  "Threesome",
  "Tie & Tease",
  "Travel Companion",
  "Watersports (giving)",
  "Watersports (receiving)",
  "Oral with condom",
  "Rimming (giving)",
  "INSEMINATION",
  "Period Play",
  "Pregnant",
  "Swinging",
  "SURROGATE",
  "Male Stripper",
  "Female Stripper",
  "Food Play",
  "Blow Job",
  "BDSM (giving)",
  "Being Filmed",
  "Couples",
  "Dinner Dates",
  "Domination (giving)",
  "Double Penetration",
  "Fisting (receiving)",
  "French Kissing",
  "GFE (Girlfriend experience)",
  "Hand Job",
  "Attending corporate parties",
  "Beach parties",
  "Bondage",
  "COB (Cum on body)",
  "Domestic carer",
  "Fetish",
  "Humiliation (receiving)",
  "MMF 3somes",
  "O-Level (Oral sex)",
  "OWO (Oral without condom)",
  "PSE (Porn Star Experience)",
  "Parties (Mandatory sex parties)",
  "Preparing a meal",
  "Prostrate Massage",
  "Receiving Oral",
  "Role Play & Fantasy",
  "Sex toys",
  "Rimming (receiving)",
  "Erotic Spanking (giving)",
  "Erotic Spanking (receiving)",
];

const FilterBox = ({open, handlePopUp}) => {
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    age: "",
    ethnicity: "",
    bust: "",
    build: "",
    looks: "",
    orientation: "",
    availability: "",
    smoker: "",
    services: [],
  });

  const toggleService = (service) => {
    setFilters((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  return (
    <div>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-pink-100 w-[90%] md:w-[70%] lg:w-[60%] max-h-[80vh] overflow-y-auto rounded-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={handlePopUp}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">Filter Escorts</h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Escort Name"
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Country"
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="State"
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, state: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="City"
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
              />
              <select
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, gender: e.target.value })
                }
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="both">Both</option>
              </select>
              <input
                type="number"
                placeholder="Age"
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, age: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Ethnicity"
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, ethnicity: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Bust Size"
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, bust: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Build"
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, build: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Looks"
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, looks: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Sexual Orientation"
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, orientation: e.target.value })
                }
              />
              <select
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, availability: e.target.value })
                }
              >
                <option value="">Availability</option>
                <option value="incall">Incall</option>
                <option value="outcall">Outcall</option>
              </select>
              <select
                className="border rounded p-2"
                onChange={(e) =>
                  setFilters({ ...filters, smoker: e.target.value })
                }
              >
                <option value="">Smoker?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Services */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                {servicesList.map((service) => (
                  <label key={service} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.services.includes(service)}
                      onChange={() => toggleService(service)}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setFilters({ ...filters, services: [] })}
              >
                Reset
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => {
                  console.log(filters); // send to API later
                  setOpen(false);
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBox;
