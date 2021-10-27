INSERT INTO department (name)
VALUES
    ('Executive'),
    ('Accounting and Finance'),
    ('Technology'),
    ('Human Resources'),
    ('Marketing and Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('CEO', 250000, 1),
    ('Account Manager', 165000, 2),
    ('Data Analyst', 150000, 3),
    ('Software Developer', 80000, 3),
    ('CFO', 210000, 2),
    ('Sales Manager', 75000, 5),
    ('HR Director', 130000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Stitt', 1, 4),
    ('Tyler', 'Kuhn', 2, 3),
    ('Jessica', 'Dunnewold', 3, 2),
    ('Lisa', 'Russell', 4, null),
    ('Retihaj', 'Bardwaj', 5, 2),
    ('Becca', 'Sun', 5, 1),
    ('Simmon', 'Wade', 3, null),
    ('Neal', 'Arnold', 4, 5),
    ('Charlotte', 'Coleman', 2, 4);