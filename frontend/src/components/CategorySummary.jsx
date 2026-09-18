import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

function CategorySummary() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/products/summary/category`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSummary(response.data.summary);
      } catch (error) {
        console.error("Failed to fetch category summary", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <section className="analytics-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ANALYTICS</p>
            <h2>Category Overview</h2>
          </div>
        </div>

        <div className="analytics-loading">Loading analytics...</div>
      </section>
    );
  }

  return (
    <section className="analytics-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ANALYTICS</p>
          <h2>Category Overview</h2>
        </div>

        <span>MongoDB Aggregation</span>
      </div>

      <div className="analytics-grid">
        {summary.map((item) => (
          <div className="analytics-card" key={item.category}>
            <div className="analytics-card-header">
              <span>{item.category}</span>
              <span>◈</span>
            </div>

            <div className="analytics-value">
              ₹{item.totalInventoryValue.toLocaleString("en-IN")}
            </div>

            <div className="analytics-details">
              <div>
                <span>Products</span>
                <strong>{item.totalProducts}</strong>
              </div>

              <div>
                <span>Stock</span>
                <strong>{item.totalStock}</strong>
              </div>

              <div>
                <span>Avg. Price</span>
                <strong>
                  ₹{item.averagePrice.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySummary;