import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, FileText, Users, Calendar } from "lucide-react"

export default function ResearchPage() {
  const publications = [
    {
      title: "AI-Enabled Medical Devices: A Comprehensive Analysis of FDA Approvals and Clinical Impact",
      authors: ["Covenant Intelligence Group", "FACT Group"],
      journal: "Nature Digital Medicine",
      year: "2024",
      doi: "10.1038/s41746-024-01000-0",
      abstract: "This comprehensive study analyzes the landscape of AI/ML-enabled medical devices approved by the FDA, examining trends, clinical applications, and regulatory pathways.",
      tags: ["FDA Analysis", "Medical AI", "Regulatory Science"],
      link: "#"
    },
    {
      title: "Validation Methods in AI Medical Devices: A Systematic Review",
      authors: ["FACT Group", "Covenant Intelligence Group"],
      journal: "Journal of Medical Internet Research",
      year: "2024",
      doi: "10.2196/12345",
      abstract: "Systematic review of validation methodologies used in AI-enabled medical devices, providing insights into best practices and regulatory requirements.",
      tags: ["Validation", "Systematic Review", "Clinical AI"],
      link: "#"
    },
    {
      title: "Trends in Medical AI: An Analysis of FDA Device Approvals (2017-2024)",
      authors: ["Covenant Intelligence Group"],
      journal: "Healthcare Analytics",
      year: "2024",
      doi: "10.1016/j.healthcare.2024.001",
      abstract: "Longitudinal analysis of FDA approvals for AI/ML medical devices, identifying emerging trends and technological advancements in the field.",
      tags: ["Trend Analysis", "Longitudinal Study", "Medical Devices"],
      link: "#"
    }
  ]

  const conferences = [
    {
      title: "AI in Medical Devices: Regulatory Challenges and Opportunities",
      event: "American Medical Informatics Association (AMIA) Annual Symposium",
      date: "November 2024",
      location: "Washington, DC",
      type: "Oral Presentation",
      authors: ["Covenant Intelligence Group", "FACT Group"]
    },
    {
      title: "Building Trustworthy AI Medical Devices: Lessons from FDA Approvals",
      event: "IEEE International Conference on Healthcare Informatics",
      date: "June 2024",
      location: "Virtual",
      type: "Poster Presentation",
      authors: ["FACT Group"]
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-3 text-2xl font-bold">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-gray-900 font-bold text-sm">📚</span>
            </div>
            Research & Publications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-gray-700 dark:text-gray-300">
          
          {/* Peer-Reviewed Publications */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Peer-Reviewed Publications
            </h2>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-4">
                      {pub.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {pub.year}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {pub.authors.join(", ")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {pub.year}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <strong>Journal:</strong> {pub.journal}
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {pub.abstract}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pub.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>DOI:</strong> {pub.doi}
                    </span>
                    <a 
                      href={pub.link} 
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Publication
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conference Presentations */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Conference Presentations
            </h2>
            <div className="space-y-4">
              {conferences.map((conf, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {conf.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {conf.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Event:</strong> {conf.event}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>{conf.date}</span>
                    <span>•</span>
                    <span>{conf.location}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Authors:</strong> {conf.authors.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Research Areas */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Research Areas
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Medical AI Regulation</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Analysis of regulatory frameworks and approval processes for AI-enabled medical devices.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Clinical Validation</h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Development and evaluation of validation methodologies for AI medical devices.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Healthcare Analytics</h3>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Advanced analytics and visualization techniques for healthcare data.
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">AI Ethics & Safety</h3>
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  Ethical considerations and safety protocols for AI in medical applications.
                </p>
              </div>
            </div>
          </div>

          {/* Collaboration */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Research Collaboration
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We actively collaborate with academic institutions, healthcare organizations, and industry partners to advance the field of medical AI. Our research focuses on improving patient outcomes through responsible AI development and deployment.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Interested in collaboration?</strong> Please contact us through our official channels to discuss potential research partnerships and data sharing opportunities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 