// Initialize sample data in localStorage
(function() {
    // Check if data already exists
    if (localStorage.getItem('users') || localStorage.getItem('orders')) {
        console.log('Data already exists in localStorage');
        return;
    }

    // Sample users data
    const sampleUsers = [
        {
            _id: 'user_1',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            phone: '9876543210',
            createdAt: new Date('2023-01-15').toISOString()
        },
        {
            _id: 'user_2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: 'password456',
            phone: '9876543211',
            createdAt: new Date('2023-02-20').toISOString()
        },
        {
            _id: 'user_3',
            name: 'Robert Johnson',
            email: 'robert@example.com',
            password: 'password789',
            phone: '9876543212',
            createdAt: new Date('2023-03-10').toISOString()
        }
    ];

    // Sample orders data
    const sampleOrders = [
        {
            orderId: 'ORD1001',
            userId: 'user_1',
            customer: {
                firstName: 'John',
                lastName: 'Doe',
                address: '123 Main St',
                city: 'New York',
                zipCode: '10001',
                phone: '9876543210'
            },
            paymentMethod: 'card',
            items: [
                {
                    id: 1,
                    name: 'Paracetamol (Acetaminophen)',
                    description: 'Effective pain relief and fever reducer. 500mg tablets.',
                    price: '₹45',
                    numericPrice: 45,
                    icon: '💊',
                    category: 'Pain Relief',
                    quantity: 2
                },
                {
                    id: 5,
                    name: 'Dextromethorphan',
                    description: 'Cough suppressant for dry cough. Syrup 100ml.',
                    price: '₹85',
                    numericPrice: 85,
                    icon: '🧴',
                    category: 'Cough & Cold',
                    quantity: 1
                }
            ],
            totalAmount: 175,
            orderDate: new Date('2023-04-15').toISOString(),
            status: 'Pending'
        },
        {
            orderId: 'ORD1002',
            userId: 'user_2',
            customer: {
                firstName: 'Jane',
                lastName: 'Smith',
                address: '456 Oak Ave',
                city: 'Los Angeles',
                zipCode: '90210',
                phone: '9876543211'
            },
            paymentMethod: 'upi',
            items: [
                {
                    id: 10,
                    name: 'Antacids (Calcium Carbonate)',
                    description: 'Relief from acidity and heartburn. Chewable tablets.',
                    price: '₹34',
                    numericPrice: 34,
                    icon: '🍃',
                    category: 'Digestive',
                    quantity: 3
                }
            ],
            totalAmount: 102,
            orderDate: new Date('2023-04-18').toISOString(),
            status: 'Processing'
        },
        {
            orderId: 'ORD1003',
            userId: 'user_3',
            customer: {
                firstName: 'Robert',
                lastName: 'Johnson',
                address: '789 Pine St',
                city: 'Chicago',
                zipCode: '60601',
                phone: '9876543212'
            },
            paymentMethod: 'cod',
            items: [
                {
                    id: 20,
                    name: 'Loratadine (Claritin)',
                    description: '24-hour allergy relief. 10mg tablets.',
                    price: '₹94',
                    numericPrice: 94,
                    icon: '💊',
                    category: 'Allergy',
                    quantity: 1
                },
                {
                    id: 30,
                    name: 'Calcium Carbonate',
                    description: 'Calcium supplement for bone health. 500mg tablets.',
                    price: '₹58',
                    numericPrice: 58,
                    icon: '💊',
                    category: 'Vitamins',
                    quantity: 2
                }
            ],
            totalAmount: 210,
            orderDate: new Date('2023-04-20').toISOString(),
            status: 'Out for Delivery'
        }
    ];

    // Sample medicines data with stock
    const sampleMedicines = [
        { id: 1, name: "Paracetamol (Acetaminophen)", price: 45, category: "Pain Relief", stock: 100 },
        { id: 2, name: "Ibuprofen", price: 62, category: "Pain Relief", stock: 80 },
        { id: 3, name: "Aspirin", price: 38, category: "Pain Relief", stock: 90 },
        { id: 4, name: "Naproxen", price: 75, category: "Pain Relief", stock: 70 },
        { id: 5, name: "Dextromethorphan", price: 85, category: "Cough & Cold", stock: 60 },
        { id: 6, name: "Guaifenesin", price: 72, category: "Cough & Cold", stock: 85 },
        { id: 7, name: "Pseudoephedrine", price: 79, category: "Cough & Cold", stock: 75 },
        { id: 8, name: "Saline Nasal Spray", price: 42, category: "Cough & Cold", stock: 120 },
        { id: 9, name: "Phenylephrine Nasal Spray", price: 58, category: "Cough & Cold", stock: 95 },
        { id: 10, name: "Antacids (Calcium Carbonate)", price: 34, category: "Digestive", stock: 110 },
        { id: 11, name: "Omeprazole", price: 125, category: "Digestive", stock: 70 },
        { id: 12, name: "Ranitidine", price: 68, category: "Digestive", stock: 80 },
        { id: 13, name: "Simethicone", price: 56, category: "Digestive", stock: 90 },
        { id: 14, name: "Loperamide", price: 68, category: "Digestive", stock: 85 },
        { id: 15, name: "Bismuth Subsalicylate", price: 145, category: "Digestive", stock: 65 },
        { id: 16, name: "Psyllium (Bulk Laxative)", price: 89, category: "Digestive", stock: 75 },
        { id: 17, name: "Docusate Sodium", price: 52, category: "Digestive", stock: 95 },
        { id: 18, name: "Bisacodyl", price: 38, category: "Digestive", stock: 100 },
        { id: 19, name: "Oral Rehydration Salts", price: 25, category: "Digestive", stock: 150 },
        { id: 20, name: "Loratadine (Claritin)", price: 94, category: "Allergy", stock: 80 },
        { id: 21, name: "Cetirizine (Zyrtec)", price: 78, category: "Allergy", stock: 85 },
        { id: 22, name: "Diphenhydramine (Benadryl)", price: 65, category: "Allergy", stock: 90 },
        { id: 23, name: "Salbutamol Inhaler", price: 185, category: "Respiratory", stock: 60 },
        { id: 24, name: "Beclometasone Inhaler", price: 245, category: "Respiratory", stock: 50 },
        { id: 25, name: "Theophylline", price: 92, category: "Respiratory", stock: 70 },
        { id: 26, name: "Dimenhydrinate", price: 52, category: "Nausea", stock: 95 },
        { id: 27, name: "Ondansetron", price: 145, category: "Nausea", stock: 65 },
        { id: 28, name: "Ginger Capsules", price: 65, category: "Nausea", stock: 85 },
        { id: 29, name: "Throat Lozenges", price: 28, category: "Throat Care", stock: 120 },
        { id: 30, name: "Calcium Carbonate", price: 58, category: "Vitamins", stock: 110 },
        { id: 31, name: "Vitamin D3", price: 125, category: "Vitamins", stock: 90 },
        { id: 32, name: "Multivitamin Complex", price: 185, category: "Vitamins", stock: 80 },
        { id: 33, name: "Iron Supplements", price: 75, category: "Vitamins", stock: 85 },
        { id: 34, name: "B-Complex Vitamins", price: 85, category: "Vitamins", stock: 95 },
        { id: 35, name: "Magnesium Supplements", price: 95, category: "Vitamins", stock: 75 },
        { id: 36, name: "Glucosamine", price: 235, category: "Vitamins", stock: 60 },
        { id: 37, name: "Hydrocortisone Cream 1%", price: 65, category: "Topical", stock: 70 },
        { id: 38, name: "Clotrimazole Cream", price: 58, category: "Topical", stock: 80 },
        { id: 39, name: "Terbinafine Cream", price: 125, category: "Topical", stock: 65 },
        { id: 40, name: "Calamine Lotion", price: 45, category: "Topical", stock: 90 },
        { id: 41, name: "Diclofenac Gel", price: 85, category: "Topical", stock: 75 },
        { id: 42, name: "Antifungal Powder", price: 48, category: "Topical", stock: 85 },
        { id: 43, name: "Melatonin 3mg", price: 165, category: "Sleep", stock: 80 },
        { id: 44, name: "Extended-Release Melatonin", price: 195, category: "Sleep", stock: 70 },
        { id: 45, name: "Cranberry Supplements", price: 125, category: "Urinary", stock: 85 },
        { id: 46, name: "Phenazopyridine", price: 85, category: "Urinary", stock: 75 },
        { id: 47, name: "Ketoconazole Shampoo", price: 185, category: "Hair Care", stock: 65 },
        { id: 48, name: "Coal Tar Shampoo", price: 145, category: "Hair Care", stock: 70 },
        { id: 49, name: "Clove Oil", price: 35, category: "Dental", stock: 95 },
        { id: 50, name: "Sumatriptan", price: 285, category: "Migraine", stock: 55 },
        { id: 51, name: "St. John's Wort", price: 165, category: "Mental Health", stock: 70 },
        { id: 52, name: "Compression Stockings", price: 385, category: "Medical Devices", stock: 40 }
    ];

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(sampleUsers));
    localStorage.setItem('orders', JSON.stringify(sampleOrders));
    localStorage.setItem('medicines', JSON.stringify(sampleMedicines));

    console.log('Sample data initialized in localStorage');
})();