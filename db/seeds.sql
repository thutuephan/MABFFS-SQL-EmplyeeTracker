INSERT INTO department (name)
VALUES
    ('Executive'),
    ('Accounting and Finance'),
    ('Technology'),
    ('Human Resources')
    ('Marketing and Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('CEO', 250000, 1),
    ('Account Manager', 165000, 2),
    ('Data Analyst', 150000, 4),
    ('Software Developer', 80000, 4)
    ('CFO', 210000, 3),
    ('Sales Manager', 75000, 6),
    ('HR Director', 130000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Stitt', 5, 4),
    ('Tyler', 'Kuhn', 1, 3);
    ('Jessica', 'Dunnewold', 2, 1);
    ('Lisa', 'Russell', 3, null);
    ('Retihaj', 'Bardwaj', 4, 5);
    ('Becca', 'Sun', 2, 6);
    ('Simmon', 'Wade', 4, null);
    ('Neal', 'Arnold', 3, 4);
    ('Charlotte', 'Coleman', 4, 1);